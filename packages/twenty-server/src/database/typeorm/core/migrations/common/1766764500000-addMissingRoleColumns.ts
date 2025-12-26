import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class AddMissingRoleColumns1766764500000 implements MigrationInterface {
  name = 'AddMissingRoleColumns1766764500000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add canBeAssignedToUsers if it doesn't exist
    const hasCanBeAssignedToUsers = await queryRunner.query(`
      SELECT column_name FROM information_schema.columns
      WHERE table_schema = 'core' AND table_name = 'role' AND column_name = 'canBeAssignedToUsers'
    `);
    if (hasCanBeAssignedToUsers.length === 0) {
      await queryRunner.query(
        `ALTER TABLE "core"."role" ADD "canBeAssignedToUsers" boolean NOT NULL DEFAULT true`,
      );
    }

    // Add canBeAssignedToAgents if it doesn't exist
    const hasCanBeAssignedToAgents = await queryRunner.query(`
      SELECT column_name FROM information_schema.columns
      WHERE table_schema = 'core' AND table_name = 'role' AND column_name = 'canBeAssignedToAgents'
    `);
    if (hasCanBeAssignedToAgents.length === 0) {
      await queryRunner.query(
        `ALTER TABLE "core"."role" ADD "canBeAssignedToAgents" boolean NOT NULL DEFAULT true`,
      );
    }

    // Add canBeAssignedToApiKeys if it doesn't exist
    const hasCanBeAssignedToApiKeys = await queryRunner.query(`
      SELECT column_name FROM information_schema.columns
      WHERE table_schema = 'core' AND table_name = 'role' AND column_name = 'canBeAssignedToApiKeys'
    `);
    if (hasCanBeAssignedToApiKeys.length === 0) {
      await queryRunner.query(
        `ALTER TABLE "core"."role" ADD "canBeAssignedToApiKeys" boolean NOT NULL DEFAULT true`,
      );
    }

    // Add morphId to fieldMetadata if it doesn't exist
    const hasMorphId = await queryRunner.query(`
      SELECT column_name FROM information_schema.columns
      WHERE table_schema = 'core' AND table_name = 'fieldMetadata' AND column_name = 'morphId'
    `);
    if (hasMorphId.length === 0) {
      await queryRunner.query(
        `ALTER TABLE "core"."fieldMetadata" ADD "morphId" character varying`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "core"."fieldMetadata" DROP COLUMN IF EXISTS "morphId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "core"."role" DROP COLUMN IF EXISTS "canBeAssignedToApiKeys"`,
    );
    await queryRunner.query(
      `ALTER TABLE "core"."role" DROP COLUMN IF EXISTS "canBeAssignedToAgents"`,
    );
    await queryRunner.query(
      `ALTER TABLE "core"."role" DROP COLUMN IF EXISTS "canBeAssignedToUsers"`,
    );
  }
}
