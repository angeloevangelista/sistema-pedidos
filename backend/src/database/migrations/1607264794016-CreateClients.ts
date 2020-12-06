import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateClients1607264794016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: 'clients',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
            isNullable: false,
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'telephone',
            type: 'varchar(30)',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('clients');
  }
}
