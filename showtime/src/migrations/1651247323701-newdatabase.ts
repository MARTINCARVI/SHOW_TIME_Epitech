import { MigrationInterface, QueryRunner } from 'typeorm';

export class setup1651235655981 implements MigrationInterface {
  name = 'setup1651235655981';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`group\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`cover_picture\` varchar(255) NOT NULL, \`category_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`picture\` varchar(255) NULL, \`group_id\` text NULL, \`concert_id\` text NULL, \`isAdmin\` int NOT NULL DEFAULT '0', \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`concert\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`place\` varchar(255) NOT NULL, \`group_id\` int NOT NULL, \`price\` varchar(255) NOT NULL, \`date\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_favorites_group_group\` (\`userId\` int NOT NULL, \`groupId\` int NOT NULL, INDEX \`IDX_c8cced280fbd1b4030fbe1bac1\` (\`userId\`), INDEX \`IDX_e97826cba454282c7beb68c5a0\` (\`groupId\`), PRIMARY KEY (\`userId\`, \`groupId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_favorites_concert_concert\` (\`userId\` int NOT NULL, \`concertId\` int NOT NULL, INDEX \`IDX_4904027d2a5d73f807117ad5ac\` (\`userId\`), INDEX \`IDX_0412ec2867f079919d2e7ec992\` (\`concertId\`), PRIMARY KEY (\`userId\`, \`concertId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_favorites_group_group\` ADD CONSTRAINT \`FK_c8cced280fbd1b4030fbe1bac19\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_favorites_group_group\` ADD CONSTRAINT \`FK_e97826cba454282c7beb68c5a07\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_favorites_concert_concert\` ADD CONSTRAINT \`FK_4904027d2a5d73f807117ad5ac4\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_favorites_concert_concert\` ADD CONSTRAINT \`FK_0412ec2867f079919d2e7ec992e\` FOREIGN KEY (\`concertId\`) REFERENCES \`concert\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_favorites_concert_concert\` DROP FOREIGN KEY \`FK_0412ec2867f079919d2e7ec992e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_favorites_concert_concert\` DROP FOREIGN KEY \`FK_4904027d2a5d73f807117ad5ac4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_favorites_group_group\` DROP FOREIGN KEY \`FK_e97826cba454282c7beb68c5a07\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_favorites_group_group\` DROP FOREIGN KEY \`FK_c8cced280fbd1b4030fbe1bac19\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_0412ec2867f079919d2e7ec992\` ON \`user_favorites_concert_concert\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_4904027d2a5d73f807117ad5ac\` ON \`user_favorites_concert_concert\``,
    );
    await queryRunner.query(`DROP TABLE \`user_favorites_concert_concert\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e97826cba454282c7beb68c5a0\` ON \`user_favorites_group_group\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c8cced280fbd1b4030fbe1bac1\` ON \`user_favorites_group_group\``,
    );
    await queryRunner.query(`DROP TABLE \`user_favorites_group_group\``);
    await queryRunner.query(`DROP TABLE \`concert\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`group\``);
    await queryRunner.query(`DROP TABLE \`category\``);
  }
}
