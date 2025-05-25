import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";

let typeORMDB: DataSource;

export default async function typeORMConnect(): Promise<void> {
  const dataSource = new DataSource({
    type: "postgres",
    url: 'postgres://madhur:asdf1234@localhost:5432/oru_user_tracking',
    entities: [
      `${__dirname}/entities/*.entity.ts`,
    ],
    synchronize: true,
  });

  typeORMDB = await dataSource.initialize();
  console.log("TypeORM connected to the database");
}

export const getDataSource = (): DataSource => typeORMDB

export function useTypeORM(
  entity: EntityTarget<ObjectLiteral>
): Repository<ObjectLiteral> {
  if (!typeORMDB) {
    throw new Error("TypeORM has not been initialized!");
  }

  return typeORMDB.getRepository(entity);
}
