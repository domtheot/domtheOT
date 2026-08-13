export default async function sitemap() {
  const baseUrl = 'https://domtheot.com';

  const routes = [
    '',
    '/about',
    '/doula-services',
    '/occupational-therapy',
    '/pregnancy-postpartum',
    '/resources',
    '/faqs',
    '/stories',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: route === '/resources' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route === '/contact' ? 0.9 : 0.8,
  }));
}
