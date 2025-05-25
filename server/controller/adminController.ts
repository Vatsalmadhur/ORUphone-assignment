import { Request, Response } from 'express';
import { getDataSource } from '../db/typeorm';
import { UserVisit } from '../db/entities/UserVisit.entity';
import { UserSession } from '../db/entities/UserSession.entity';
import { VisitAction } from '../db/entities/VisitAction.entity';

export async function getAnalyticsReport(req: Request, res: Response) :Promise<void> {
  try {
    const dataSource = getDataSource();
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      res.status(400).json({ message: 'startDate and endDate are required' });
			return;
    }

    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    // 1. Total unique user visits (using UserVisit)
    const totalUniqueVisits = await dataSource
      .getRepository(UserVisit)
      .createQueryBuilder('visit')
      .where('visit.createdAt BETWEEN :start AND :end', { start, end })
      .getCount();

    // 2. Top 10 visited pages
const topPages = await dataSource
  .getRepository(UserVisit)
  .createQueryBuilder('visit')
  .select('visit.pageUrl', 'pageUrl')
  .addSelect('COUNT(*)', 'visitCount')
  .where('visit.createdAt BETWEEN :start AND :end', { start, end })
  .groupBy('visit.pageUrl')
  .orderBy('"visitCount"', 'DESC')
  .limit(10)
  .getRawMany();

    // 3. Average time spent per page
const avgTimeSpent = await dataSource
  .getRepository(UserVisit)
  .createQueryBuilder('visit')
  .select('visit.pageUrl', 'pageUrl')
  .addSelect('AVG(visit.timeSpent) AS "avgTime"')
  .where('visit.createdAt BETWEEN :start AND :end', { start, end })
  .groupBy('visit.pageUrl')
  .orderBy('"avgTime"', 'DESC')
  .getRawMany();

    // 4. Top 10 popular devices
    const topDevices = await dataSource
      .getRepository(UserSession)
      .createQueryBuilder('session')
      .select('session.device', 'device')
      .addSelect('COUNT(*)', 'count')
      .where('session.createdAt BETWEEN :start AND :end', { start, end })
      .groupBy('session.device')
      .orderBy('count', 'DESC')
      .limit(10)
      .getRawMany();

    // 5. Top 10 clicked elements (based on VisitAction.element)
    const topClickedElements = await dataSource
      .getRepository(VisitAction)
      .createQueryBuilder('action')
      .select('action.element', 'element')
      .addSelect('COUNT(*)', 'clicks')
      .where('action.createdAt BETWEEN :start AND :end', { start, end })
      .andWhere('action.element IS NOT NULL')
      .groupBy('action.element')
      .orderBy('clicks', 'DESC')
      .limit(10)
      .getRawMany();

    // 6. Most popular device categories
    const allSessions = await dataSource
      .getRepository(UserSession)
      .createQueryBuilder('session')
      .select('session.device', 'device')
      .where('session.createdAt BETWEEN :start AND :end', { start, end })
      .getRawMany();

    const categoryCount = allSessions.reduce((acc, row) => {
      const device = row.device?.toLowerCase() || '';
      let category = 'Other';
      if (device.includes('apple')) category = 'Apple';
      else if (device.includes('samsung')) category = 'Samsung';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

const deviceCategories = Object.entries(categoryCount)
  .map(([category, count]) => ({ category, count: Number(count) }))
  .sort((a, b) => b.count - a.count);

    // 7. LoggedIn vs LoggedOut users
    const loggedStatusStats = await dataSource
      .getRepository(UserSession)
      .createQueryBuilder('session')
      .select('session.isLoggedIn', 'isLoggedIn')
      .addSelect('COUNT(*)', 'count')
      .where('session.createdAt BETWEEN :start AND :end', { start, end })
      .groupBy('session.isLoggedIn')
      .getRawMany();

    // 8. Average sessions per logged-in user (with non-null username)
    const userSessionCounts = await dataSource
      .getRepository(UserSession)
      .createQueryBuilder('session')
      .select('session.sessionId', 'sessionId') // No username field, using sessionId
      .addSelect('COUNT(*)', 'sessionCount')
      .where('session.isLoggedIn = true')
      .andWhere('session.createdAt BETWEEN :start AND :end', { start, end })
      .groupBy('session.sessionId') // Grouping by sessionId as we don't have username
      .getRawMany();

    const avgSessionsPerUser = userSessionCounts.length
      ? userSessionCounts.reduce((sum, row) => sum + Number(row.sessionCount), 0) / userSessionCounts.length
      : 0;

    // Final response
     res.json({
      totalUniqueVisits,
      topPages,
      avgTimeSpent,
      topDevices,
      topClickedElements,
      deviceCategories,
      loggedStatusStats,
      avgSessionsPerUser,
    });
return;
  } catch (err) {
    console.error(err);
     res.status(500).json({ message: 'Internal Server Error' });
		return;
  }
}

