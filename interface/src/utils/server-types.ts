import { RootConfig, DataTransformerOptions, ProcedureRouterRecord } from "@trpc/server";
import { Router, RouterDef } from "@trpc/server/dist/core/router";

export type AppRouter = Router<RouterDef<RootConfig<{
  ctx: {};
  meta: object;
  errorShape: never;
  transformer: DataTransformerOptions;
}>, ProcedureRouterRecord, {
  queries: {};
  mutations: {};
  subscriptions: {};
}>> & ProcedureRouterRecord