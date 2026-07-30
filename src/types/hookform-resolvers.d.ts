declare module "@hookform/resolvers/zod" {
  import type { Resolver } from "react-hook-form";
  import type { ZodSchema } from "zod";
  export function zodResolver<T extends ZodSchema<any, any, any>>(schema: T): Resolver<import("zod").infer<T>>;
}
