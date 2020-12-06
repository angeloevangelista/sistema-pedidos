import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class SettingPriceFieldNotToAllowNull1607281486480
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('UPDATE products SET price = 0');

    await queryRunner.changeColumn(
      'products',
      'price',
      new TableColumn({
        name: 'price',
        type: 'decimal(5, 2)',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'products',
      'price',
      new TableColumn({
        name: 'price',
        type: 'decimal(5, 2)',
        isNullable: true,
      }),
    );
  }
}
