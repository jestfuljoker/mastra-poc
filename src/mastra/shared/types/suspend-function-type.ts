import { type InnerOutput, type SuspendOptions } from "@mastra/core/workflows";

export type SuspendFunction<TPayload = unknown> = (
	suspendPayload: TPayload,
	suspendOptions?: SuspendOptions,
) => InnerOutput | Promise<InnerOutput>;
