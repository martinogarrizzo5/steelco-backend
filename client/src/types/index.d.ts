import { Factory, Injury } from "@prisma/client";

interface MonthlyReport {
  date: Date;
  count: number;
}

interface InjuryWithFactory extends Injury {
  factory: Factory;
}
