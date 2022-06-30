import { ApplicationType } from '../models/application-type.model';
import { Component } from 'solid-js';

export interface BenchmarksNavProps {
  appType: ApplicationType;
}

const BenchmarksNav: Component<BenchmarksNavProps> = function ({ appType }) {
  return (
    <>
      <div class="flex space-x-3 items-center text-sm mt-3 px-6">
        <div>
          {appType.benchmarks.map((b) => (
            <>
              <a
                href={'/app-type/' + appType.id + '/benchmark/' + b.id}
                class="py-1 px-2 rounded text-sm bg-fuchsia-500 color-white"
              >
                {b.name}
              </a>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default BenchmarksNav;
