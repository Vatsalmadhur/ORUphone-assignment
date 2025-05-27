import { Request, Response } from 'express';
import { getDataSource } from '../db/typeorm';
import { UserVisit } from '../db/entities/UserVisit.entity';
import { UserSession } from '../db/entities/UserSession.entity';
import { VisitAction } from '../db/entities/VisitAction.entity';

interface HourlyTrafficData {
  hour: number;
  count: number;
  label: string; // "12 AM", "1 PM", etc.
}

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

  const browserData = await dataSource
    .getRepository(UserSession)
    .createQueryBuilder('session')
    .select('session.browser', 'browser')
    .addSelect('COUNT(*)', 'count')
    .where('session.createdAt BETWEEN :start AND :end', { start, end })
    .andWhere('session.browser != :unknown', { unknown: 'unknown' })
    .groupBy('session.browser')
    .orderBy('"count"', 'DESC')
    .getRawMany();

  const totalBrowser = browserData.reduce((sum, item) => sum + parseInt(item.count), 0);

  const processedBrowserData = browserData.map(item => {
    let browserName = item.browser;
    
    if (browserName.toLowerCase().includes('chrome')) {
      browserName = 'Chrome';
    } else if (browserName.toLowerCase().includes('safari') && !browserName.toLowerCase().includes('chrome')) {
      browserName = 'Safari';
    } else if (browserName.toLowerCase().includes('firefox')) {
      browserName = 'Firefox';
    } else if (browserName.toLowerCase().includes('edge')) {
      browserName = 'Edge';
    } else if (browserName.toLowerCase().includes('opera')) {
      browserName = 'Opera';
    } else if (browserName.toLowerCase().includes('internet explorer') || browserName.toLowerCase().includes('ie')) {
      browserName = 'Internet Explorer';
    } else {
      browserName = browserName.split(' ')[0] || 'Other';
    }

    return {
      name: browserName,
      count: parseInt(item.count),
      value: parseFloat(((parseInt(item.count) / totalBrowser) * 100).toFixed(1))
    };
  });

    const osData = await dataSource
    .getRepository(UserSession)
    .createQueryBuilder('session')
    .select('session.os', 'os')
    .addSelect('COUNT(*)', 'count')
    .where('session.createdAt BETWEEN :start AND :end', { start, end })
    .andWhere('session.os != :unknown', { unknown: 'unknown' })
    .groupBy('session.os')
    .orderBy('"count"', 'DESC')
    .getRawMany();

  const totalOs = osData.reduce((sum, item) => sum + parseInt(item.count), 0);

  const processedOsData = osData.map(item => {
    let osName = item.os;
    
    // Extract main OS name
    if (osName.toLowerCase().includes('windows')) {
      osName = 'Windows';
    } else if (osName.toLowerCase().includes('ios') || osName.toLowerCase().includes('iphone') || osName.toLowerCase().includes('ipad')) {
      osName = 'iOS';
    } else if (osName.toLowerCase().includes('android')) {
      osName = 'Android';
    } else if (osName.toLowerCase().includes('mac') || osName.toLowerCase().includes('darwin')) {
      osName = 'macOS';
    } else if (osName.toLowerCase().includes('linux')) {
      osName = 'Linux';
    } else if (osName.toLowerCase().includes('ubuntu')) {
      osName = 'Ubuntu';
    } else if (osName.toLowerCase().includes('chrome os') || osName.toLowerCase().includes('chromeos')) {
      osName = 'Chrome OS';
    } else {
      osName = osName.split(' ')[0] || 'Other';
    }

    return {
      name: osName,
      count: parseInt(item.count),
      value: parseFloat(((parseInt(item.count) / totalOs) * 100).toFixed(1))
    };
  });

    const hourlyData = await dataSource
    .getRepository(UserSession)
    .createQueryBuilder('session')
    .select('EXTRACT(HOUR FROM session.createdAt)', 'hour')
    .addSelect('COUNT(*)', 'count')
    .where('session.createdAt BETWEEN :start AND :end', { start, end })
    .groupBy('EXTRACT(HOUR FROM session.createdAt)')
    .orderBy('hour', 'ASC')
    .getRawMany();

  // Create array for all 24 hours (fill missing hours with 0)
  const completeHourlyData: HourlyTrafficData[] = [];
  
  for (let hour = 0; hour < 24; hour++) {
    const existingData = hourlyData.find(item => parseInt(item.hour) === hour);
    const count = existingData ? parseInt(existingData.count) : 0;
    
    // Format hour label (12-hour format with AM/PM)
    const label = hour === 0 ? '12 AM' 
                : hour < 12 ? `${hour} AM`
                : hour === 12 ? '12 PM'
                : `${hour - 12} PM`;
    
    completeHourlyData.push({
      hour,
      count,
      label
    });
  }
 const locationData = await dataSource
    .getRepository(UserSession)
    .createQueryBuilder('session')
    .select('session.location', 'location')
    .addSelect('COUNT(*)', 'count')
    .where('session.createdAt BETWEEN :start AND :end', { start, end })
    .andWhere('session.location != :unknown', { unknown: 'unknown' })
    .andWhere('session.location IS NOT NULL')
    .andWhere('session.location != :empty', { empty: '' })
    .groupBy('session.location')
    .orderBy('"count"', 'DESC')
    .getRawMany();

  const totalLD = locationData.reduce((sum, item) => sum + parseInt(item.count), 0);

  const processedLocationData = locationData.map(item => {
    let locationName = item.location;
    
    locationName = locationName.trim();
    
    if (locationName.includes(',')) {
      const parts = locationName.split(',');
      locationName = parts[parts.length - 1].trim();
    }

    return {
      name: locationName,
      count: parseInt(item.count),
      value: parseFloat(((parseInt(item.count) / totalLD) * 100).toFixed(1))
    };
  });
     res.json({
      totalUniqueVisits,
      topPages,
      avgTimeSpent,
      topDevices,
      topClickedElements,
      deviceCategories,
      loggedStatusStats,
      avgSessionsPerUser,
      processedBrowserData,
      processedOsData,
      completeHourlyData,
      processedLocationData
    });
return;
  } catch (err) {
    console.error(err);
     res.status(500).json({ message: 'Internal Server Error' });
		return;
  }
}

