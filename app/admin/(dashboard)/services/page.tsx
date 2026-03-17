import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import ServiceToggle from './ServiceToggle';
import NewServiceForm from './NewServiceForm';

export default async function ServicesAdminPage() {
  const services = await prisma.servicePage.findMany({ orderBy: { sortOrder: 'asc' } });
  const enabledCount = services.filter((s) => s.isEnabled).length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
          <p className="text-sm text-gray-500 mt-1">
            {enabledCount} of {services.length} enabled
          </p>
        </div>
        <NewServiceForm />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {services.length === 0 ? (
          <p className="px-6 py-10 text-sm text-gray-500 text-center">No services yet. Add one above.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Service</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600 hidden md:table-cell">Slug</th>
                <th className="px-6 py-3 font-medium text-gray-600 text-center">Visible</th>
                <th className="px-6 py-3 font-medium text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{service.name}</span>
                    {!service.isEnabled && (
                      <span className="ml-2 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Hidden</span>
                    )}
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <code className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{service.slug}</code>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <ServiceToggle id={service.id} slug={service.slug} isEnabled={service.isEnabled} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/services/${service.slug}`}
                        target="_blank"
                        className="text-xs text-gray-400 hover:text-gray-600"
                      >
                        Preview ↗
                      </Link>
                      <Link
                        href={`/admin/services/${service.slug}`}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
