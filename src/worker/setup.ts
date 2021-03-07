import Dexie from "dexie";
import { db } from "./db";

const authors = ["foo", "bar", "hoge", "huga"];

const makeLowDispersal = (index: number) => ({
  title: `title${index}`,
  author: authors[index % 4],
  text: `text${index}`,
  published_at: index,
  url: `url${index}`,
});

const makeLowGathered = (index: number) => ({
  data: {
    title: `title${index}`,
    author: authors[index % 4],
    text: `text${index}`,
    published_at: index,
    url: `url${index}`,
  },
});

const loopTimes = 2000;
const half = loopTimes / 2;

const makeLows = (func: (index: number) => any) => {
  const lows = [...Array(loopTimes).keys()].map((e) => func(e));
  return lows;
};

const ioMaker = (
  lowMaker: (index: number) => any,
  table: Dexie.Table<any, string>,
  outFunc: () => Promise<any>,
) => {
  const lows = makeLows(lowMaker);
  return {
    cleanup: () => table.clear(),
    in: () => table.bulkAdd(lows),
    out: outFunc,
  };
};

export type IO = ReturnType<typeof ioMaker>;

const ioDispersalNormal = ioMaker(makeLowDispersal, db.dispersalNormal, () =>
  db.dispersalNormal
    .where("author")
    .equals("bar")
    .filter((e) => e.published_at >= half)
    .toArray(),
);

const ioDispersalIndex = ioMaker(makeLowDispersal, db.dispersalIndex, () =>
  db.dispersalIndex
    .where(["author", "published_at"])
    .between(["bar", half], ["bar", Infinity], true, true)
    .toArray(),
);

const ioGatheredNormal = ioMaker(makeLowGathered, db.gatheredNormal, () =>
  db.gatheredNormal
    .where("data.author")
    .equals("bar")
    .filter((e) => e.data.published_at >= half)
    .toArray(),
);

const ioGatheredIndex = ioMaker(makeLowGathered, db.gatheredIndex, () =>
  db.gatheredIndex
    .where(["data.author", "data.published_at"])
    .between(["bar", half], ["bar", Infinity], true, true)
    .toArray(),
);

export const ioData = {
  ioDispersalNormal,
  ioDispersalIndex,
  ioGatheredNormal,
  ioGatheredIndex,
};
