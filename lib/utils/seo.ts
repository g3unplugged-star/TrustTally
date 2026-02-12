/**
 * Generate meta title for calculator pages
 */
export function generateTitle(calculatorName: string): string {
  return `${calculatorName} | TrustTally – Free U.S. Financial Calculator`;
}

/**
 * Generate meta description for calculator pages
 */
export function generateDescription(
  calculatorName: string,
  keywords: string[],
  type: 'mortgage' | 'retirement' | 'investing' | 'affordability'
): string {
  const descriptions = {
    mortgage: `Free ${calculatorName}. See how extra payments save thousands in interest. No login, no ads, 100% private. U.S. mortgage rates 2026.`,
    retirement: `Free ${calculatorName}. Project your 401k, IRA, and retirement savings with DCA and employer match. Updated for 2026.`,
    investing: `Free ${calculatorName}. Calculate compound growth, dividend reinvestment, and dollar cost averaging. S&P 500 historical returns.`,
    affordability: `Free ${calculatorName}. How much house can you afford? Based on income, debt, down payment. 43% DTI qualified mortgage.`
  };
  
  return descriptions[type] || `Free ${calculatorName}. No signup required. Trust your numbers, tally your future.`;
}

/**
 * Generate canonical URL
 */
export function generateCanonical(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trusttally.com';
  return `${baseUrl}${path}`;
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(items: { name: string; item?: string }[]) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trusttally.com';
  
  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    ...(item.item && { item: `${baseUrl}${item.item}` })
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement
  };
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TrustTally',
    url: 'https://trusttally.com',
    logo: 'https://trusttally.com/logo.png',
    sameAs: [
      'https://twitter.com/trusttally',
      'https://www.facebook.com/trusttally'
    ],
    description: 'Free U.S. financial calculators for mortgages, retirement, and investing. No login, no ads, 100% private.',
    foundingDate: '2026',
    founder: {
      '@type': 'Organization',
      name: 'TrustTally Team'
    }
  };
}

/**
 * Generate WebSite schema
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TrustTally',
    url: 'https://trusttally.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://trusttally.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

/**
 * Generate Calculator schema
 */
export function generateCalculatorSchema(
  name: string,
  description: string,
  url: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `TrustTally ${name}`,
    description,
    applicationCategory: 'Finance',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    url: `https://trusttally.com${url}`
  };
}

/**
 * Generate Article schema for blog posts
 */
export function generateArticleSchema(
  title: string,
  description: string,
  url: string,
  datePublished: string,
  dateModified?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: 'https://trusttally.com/og-image.png',
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: 'TrustTally'
    },
    publisher: {
      '@type': 'Organization',
      name: 'TrustTally',
      logo: {
        '@type': 'ImageObject',
        url: 'https://trusttally.com/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://trusttally.com${url}`
    }
  };
}

/**
 * Extract keywords from text for meta tags
 */
export function extractKeywords(text: string, maxKeywords: number = 10): string[] {
  const stopWords = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he',
    'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were',
    'will', 'with', 'the', 'this', 'that', 'these', 'those'
  ]);

  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));

  const wordCount: Record<string, number> = {};
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });

  return Object.entries(wordCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxKeywords)
    .map(([word]) => word);
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(siteUrl: string): string {
  return `# TrustTally robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Sitemap: ${siteUrl}/sitemap.xml

# Crawl delay for bots
User-agent: *
Crawl-delay: 1
`;
}

/**
 * Check if URL is canonical
 */
export function isCanonical(path: string): boolean {
  const nonCanonicalPatterns = [
    /\/$/,
    /index\.html$/,
    /\/page\/\d+\/$/,
    /\?.*/,
    /#.*/
  ];
  
  return !nonCanonicalPatterns.some(pattern => pattern.test(path));
}

/**
 * Generate pagination URLs
 */
export function generatePaginationUrls(
  basePath: string,
  currentPage: number,
  totalPages: number
): {
  prev?: string;
  next?: string;
  first: string;
  last: string;
} {
  const result: any = {
    first: basePath,
    last: `${basePath}?page=${totalPages}`
  };

  if (currentPage > 1) {
    result.prev = currentPage === 2 
      ? basePath 
      : `${basePath}?page=${currentPage - 1}`;
  }

  if (currentPage < totalPages) {
    result.next = `${basePath}?page=${currentPage + 1}`;
  }

  return result;
}
