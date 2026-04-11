import type { ProductFrontmatter } from '@/lib/types';
import { FEATURE_LABELS } from '@/lib/constants';
import { CheckIcon, MinusIcon } from './Icons';

interface FeatureMatrixProps {
  products: ProductFrontmatter[];
}

export default function FeatureMatrix({ products }: FeatureMatrixProps) {
  const featureKeys = Object.keys(FEATURE_LABELS);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="sticky left-0 bg-white py-3 pl-4 pr-6 text-left font-semibold text-gray-900">
              Fonctionnalite
            </th>
            {products.map((p) => (
              <th
                key={p.slug}
                className="min-w-[120px] px-4 py-3 text-center font-semibold text-gray-900"
              >
                {p.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featureKeys.map((key) => (
            <tr key={key} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="sticky left-0 bg-white py-3 pl-4 pr-6 font-medium text-gray-700">
                {FEATURE_LABELS[key]}
              </td>
              {products.map((p) => {
                const value = p.features[key as keyof typeof p.features];
                return (
                  <td key={p.slug} className="px-4 py-3">
                    <div className="flex justify-center">
                      {typeof value === 'boolean' ? (
                        value ? (
                          <CheckIcon className="h-5 w-5 text-green-500" />
                        ) : (
                          <MinusIcon className="h-5 w-5 text-gray-300" />
                        )
                      ) : value !== null ? (
                        <span className="font-medium text-gray-700">{value}</span>
                      ) : (
                        <MinusIcon className="h-5 w-5 text-gray-300" />
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
