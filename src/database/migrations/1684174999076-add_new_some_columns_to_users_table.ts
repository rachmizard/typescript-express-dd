import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddNewSomeColumnsToUsersTable1684174999076 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'username',
        type: 'varchar',
        isUnique: true,
        isNullable: true,
      }),

      new TableColumn({
        name: 'profile_picture',
        type: 'varchar',
        isNullable: true,
      }),

      new TableColumn({
        name: 'bio',
        type: 'varchar',
        isNullable: true,
      }),

      new TableColumn({
        name: 'location',
        type: 'varchar',
        isNullable: true,
      }),

      new TableColumn({
        name: 'website',
        type: 'varchar',
        isNullable: true,
      }),

      new TableColumn({
        name: 'birth_date',
        type: 'date',
        isNullable: true,
      }),

      new TableColumn({
        name: 'phone_number',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', ['profile_picture', 'username', 'bio', 'location', 'website', 'birth_date', 'phone_number']);
  }
}
