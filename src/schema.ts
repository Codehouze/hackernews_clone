import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefinitions } from "./types";

type Link = { id: string; url: string; description: string };

const links: Link[] = [
  {
    id: "link-0",
    url: "https://graphql-yoga.com",
    description: "The easiest way of setting up a GraphQl server",
  },
];

const resolvers = {
  Query: {
    info: () => "This is the API OF A Hacker News Clone",

    feed: () => links,
  },
  // how graphql maps fields with resolvers...
  //   Link: {
  //     id: (parent: Link) => parent.id,
  //     description: (parent: Link) => parent.description,
  //     url: (parent: Link) => parent.url,
  //   },
  Mutation: {
    postLink: (parent: unknown, args: { description: string; url: string }) => {
      let idCount = links.length;

      const link: Link = {
        id: `link-${idCount}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
  },
};

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});
