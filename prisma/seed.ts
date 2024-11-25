import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Industry Trends',
        slug: 'industry-trends',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Technology',
        slug: 'technology',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Regulation',
        slug: 'regulation',
      },
    }),
  ]);

  // Create authors
  const authors = await Promise.all([
    prisma.author.create({
      data: {
        name: 'Sarah Johnson',
        bio: 'Insurance industry analyst with 15 years of experience covering insurtech and digital transformation.',
        twitterLink: 'https://twitter.com/sarahjohnson',
        linkedinLink: 'https://linkedin.com/in/sarahjohnson',
      },
    }),
    prisma.author.create({
      data: {
        name: 'Michael Chen',
        bio: 'Former insurance executive turned consultant, specializing in regulatory compliance and risk management.',
        twitterLink: 'https://twitter.com/michaelchen',
        linkedinLink: 'https://linkedin.com/in/michaelchen',
      },
    }),
  ]);

  // Create articles
  await Promise.all([
    prisma.article.create({
      data: {
        title: 'AI Revolutionizes Insurance Underwriting',
        slug: 'ai-revolutionizes-insurance-underwriting',
        excerpt: 'How artificial intelligence is transforming the underwriting process and improving risk assessment accuracy.',
        content: `
# AI Revolutionizes Insurance Underwriting

Artificial intelligence is fundamentally changing how insurance companies approach underwriting, bringing unprecedented accuracy and efficiency to risk assessment processes.

## The Impact of AI on Underwriting

Modern AI algorithms can process vast amounts of data points in seconds, considering factors that human underwriters might miss. This leads to:

- More accurate risk assessments
- Faster application processing
- Reduced bias in decision-making
- Better pricing models

## Real-World Applications

Leading insurance companies are already implementing AI-driven underwriting systems, reporting:

- 40% reduction in processing time
- 25% improvement in risk assessment accuracy
- 15% decrease in claims ratios

## The Future of AI in Insurance

As AI technology continues to evolve, we can expect to see:

1. Real-time risk assessment
2. Automated policy customization
3. Predictive analytics for risk prevention

The integration of AI in underwriting is not just a trend—it's the future of insurance.
        `,
        publishedDate: new Date('2024-03-15'),
        isFeatured: true,
        authorId: authors[0].id,
        categoryId: categories[1].id,
      },
    }),
    prisma.article.create({
      data: {
        title: 'New Insurance Regulations Coming in 2024',
        slug: 'new-insurance-regulations-2024',
        excerpt: 'Key regulatory changes affecting the insurance industry and how companies can prepare for compliance.',
        content: `
# New Insurance Regulations Coming in 2024

The insurance industry faces significant regulatory changes in 2024. Here's what companies need to know to ensure compliance.

## Key Changes

Several major regulatory updates are scheduled to take effect:

1. Enhanced data privacy requirements
2. New capital adequacy standards
3. Updated disclosure requirements
4. Stricter cybersecurity protocols

## Impact on Insurance Companies

These changes will require:

- Updated compliance programs
- Enhanced reporting systems
- Modified customer communication protocols
- Improved data security measures

## Preparation Strategies

Companies should:

- Review current compliance programs
- Update internal policies
- Train staff on new requirements
- Implement necessary technological changes

Early preparation will be key to smooth compliance transition.
        `,
        publishedDate: new Date('2024-03-14'),
        isFeatured: false,
        authorId: authors[1].id,
        categoryId: categories[2].id,
      },
    }),
  ]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });