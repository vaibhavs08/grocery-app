import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class GroceryItem1713493528691 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'grocery_item',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "price",
                    type: "decimal",
                    precision: 10,
                    scale: 2,
                    isNullable: false
                },
                {
                    name: "inventory",
                    type: "int",
                    isNullable: false
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("grocery_item");
    }

}
