import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPasswordFieldToClients1607286329745
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // oh no, I will need to delete these clients ;-;
    await queryRunner.query('DELETE FROM clients');

    await queryRunner.addColumn(
      'clients',
      new TableColumn({
        name: 'password',
        type: 'varchar(200)',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('clients', 'password');
  }
}
