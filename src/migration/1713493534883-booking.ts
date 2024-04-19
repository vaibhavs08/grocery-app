import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Booking1713493534883 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'booking',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "totalPrice",
                    type: "decimal",
                    precision: 10,
                    scale: 2,
                    isNullable: false
                },
                {
                    name: "userId",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "itemId",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "quantity",
                    type: "int",
                    isNullable: false
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("booking");
    }
}
