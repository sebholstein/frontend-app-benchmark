export interface ApplicationType {
  id: string;
  name: string;
  apps: number;
  benchmarks: Benchmark[];
}

export interface Benchmark {
  id: string;
  name: string;
}
