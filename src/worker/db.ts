import Dexie from "dexie";

const bookDispersalNormalColumns = [
  "title",
  "author",
  "text",
  "published_at",
  "url",
];

const bookDispersalIndexColumns = [
  "title",
  "author",
  "text",
  "published_at",
  "url",
  "[author+published_at]",
];

const bookGatheredNormalColumns = [
  "data.title",
  "data",
  "data.author",
  "data.published_at",
];

const bookGatheredIndexColumns = [
  "data.title",
  "data",
  "data.author",
  "data.published_at",
  "[data.author+data.published_at]",
];

const makeSchema = (columns: string[]) => columns.join(", ");

class DB extends Dexie {
  dispersalNormal!: Dexie.Table<any, string>;

  dispersalIndex!: Dexie.Table<any, string>;

  gatheredNormal!: Dexie.Table<any, string>;

  gatheredIndex!: Dexie.Table<any, string>;

  constructor() {
    super("book_list");

    this.version(1).stores({
      dispersalNormal: makeSchema(bookDispersalNormalColumns),
      dispersalIndex: makeSchema(bookDispersalIndexColumns),
      gatheredNormal: makeSchema(bookGatheredNormalColumns),
      gatheredIndex: makeSchema(bookGatheredIndexColumns),
    });
  }
}

export const db = new DB();
