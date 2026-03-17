import { prisma } from '@/lib/prisma';
import { saveGoogleReviewsSettings, refreshGoogleReviews } from '../actions';

export default async function GoogleReviewsPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 'global' } });

  const cachedReviews = settings?.cachedReviews as any;
  const reviewList: any[] = cachedReviews?.reviews ?? [];
  const hasApiKey = !!process.env.GOOGLE_PLACES_API_KEY;

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Google Reviews</h1>
        <p className="text-sm text-gray-500 mt-1">
          Connect your Google Business Profile to display reviews on your website.
        </p>
      </div>

      {!hasApiKey && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
          <p className="text-sm text-amber-800 font-medium">GOOGLE_PLACES_API_KEY not set</p>
          <p className="text-sm text-amber-700 mt-1">
            Add <code className="bg-amber-100 px-1 rounded text-xs">GOOGLE_PLACES_API_KEY</code> to your environment variables (Vercel dashboard or .env.local) to enable live review fetching.
          </p>
        </div>
      )}

      {/* Settings form */}
      <form action={saveGoogleReviewsSettings} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        <h2 className="font-semibold text-gray-900">Configuration</h2>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="googleReviewsEnabled"
            name="googleReviewsEnabled"
            defaultChecked={settings?.googleReviewsEnabled ?? false}
            className="rounded"
          />
          <label htmlFor="googleReviewsEnabled" className="text-sm font-medium text-gray-700">
            Show Google Reviews on the website
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Google Place ID
          </label>
          <input
            type="text"
            name="googlePlacesId"
            defaultValue={settings?.googlePlacesId ?? ''}
            placeholder="ChIJ..."
            className="w-full max-w-md rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-400 mt-1">
            Find your Place ID at{' '}
            <span className="font-mono">developers.google.com/maps/documentation/places/web-service/place-id</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
            <select
              name="googleReviewsMinRating"
              defaultValue={settings?.googleReviewsMinRating ?? 4}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n} star{n > 1 ? 's' : ''} and above</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Reviews</label>
            <input
              type="number"
              name="googleReviewsMaxCount"
              defaultValue={settings?.googleReviewsMaxCount ?? 10}
              min={1}
              max={50}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cache TTL (hours)</label>
            <input
              type="number"
              name="googleReviewsCacheTtlHours"
              defaultValue={settings?.googleReviewsCacheTtlHours ?? 24}
              min={1}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          Save Settings
        </button>
      </form>

      {/* Refresh + cache info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-900">Cached Reviews</h2>
            {settings?.cachedReviewsAt ? (
              <p className="text-xs text-gray-500 mt-0.5">
                Last refreshed: {new Date(settings.cachedReviewsAt).toLocaleString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric',
                  hour: 'numeric', minute: '2-digit',
                })}
              </p>
            ) : (
              <p className="text-xs text-gray-400 mt-0.5">No reviews cached yet</p>
            )}
          </div>
          <form action={refreshGoogleReviews}>
            <button
              type="submit"
              disabled={!hasApiKey || !settings?.googlePlacesId}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Refresh Now
            </button>
          </form>
        </div>

        {reviewList.length > 0 ? (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {reviewList.slice(0, settings?.googleReviewsMaxCount ?? 10).map((r: any, i: number) => (
              <div key={i} className="border border-gray-100 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900">{r.author_name}</p>
                  <span className="text-xs text-yellow-500">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{r.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center py-4">
            {hasApiKey && settings?.googlePlacesId
              ? 'Click "Refresh Now" to fetch reviews from Google.'
              : 'Configure your Place ID and API key first.'}
          </p>
        )}
      </div>
    </div>
  );
}
