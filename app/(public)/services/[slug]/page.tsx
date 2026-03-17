import { notFound } from 'next/navigation';
import { getServiceData } from '@/lib/content';
import ServicePageClient from './ServicePageClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const serviceData = await getServiceData(slug);

  if (!serviceData) {
    notFound();
  }

  return <ServicePageClient serviceData={serviceData} />;
}
