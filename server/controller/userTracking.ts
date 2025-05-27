import { Request, Response } from "express";
import { UserSession } from "../db/entities/UserSession.entity";
import { UserVisit } from "../db/entities/UserVisit.entity";
import { VisitAction } from "../db/entities/VisitAction.entity";
import { useTypeORM } from "../db/typeorm";

export default async function userTracking(req: Request, res: Response): Promise<void> {
  if (!req.session?.userData) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const event = req.body[0];
  const sessionData = req.session.userData;
  const sessionRepo = useTypeORM(UserSession);
  const visitRepo = useTypeORM(UserVisit);
  const actionRepo = useTypeORM(VisitAction);

  try {
    // Check if session already exists
    let session = await sessionRepo.findOne({
      where: { sessionId: sessionData.sessionId },
    });

    if (!session) {
      session = sessionRepo.create({
        sessionId: sessionData.sessionId,
        ip: sessionData.ip || '',
        browser: sessionData.browser,
        location: sessionData.location,
        device: sessionData.device,
        os: sessionData.os,
        isLoggedIn: sessionData.isLoggedIn,
        isAdmin: sessionData.isAdmin || false,
        visitData: {}, // optional: store complex info here
      });
      await sessionRepo.save(session);
      console.log(`Inserted session: ${session.sessionId}`);
    }

    // Create a visit entry
    const newVisit = visitRepo.create({
      session: session,
      pageUrl: event.page,
      timeSpent: event.timeSpent || 0,
      screenSize: event.screenSize || null,
      scrollDepth: event.scrollDepth || null,
    });

    // Save visit first to generate its ID
    const savedVisit = await visitRepo.save(newVisit);

    // Save related actions
    const actions: VisitAction[] = (event.clicks || []).map((act: any) =>
      actionRepo.create({
        visit: savedVisit,
        element: act,
      })
    );

    if (actions.length > 0) {
      await actionRepo.save(actions);
    }

    res.json({ message: "Tracking data saved successfully" });
  } catch (error) {
    console.error("Error saving tracking data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

