// Journal entries are edited here. Article content is plain text with paragraph breaks.
export const journal = [
  {
    id: "j1",
    slug: "automate-excel-without-vba-pain",
    title: "Automate Excel Without VBA Pain: Power Query First",
    excerpt:
      "Most people jump to VBA. I start with Power Query — 80% of automation without code. Here is my stack.",
    content:
      "Power Query is the most underrated tool in Excel. For years I did everything in VBA, then realized 80% of repetitive tasks are just data shaping.\n\nSteps:\n1. Use Power Query for cleaning.\n2. Use Tables, not ranges.\n3. Use Dynamic Arrays.\n4. Only then use VBA for UI.\n\nThis reduces bug surface by 60%. Example: the sales dashboard earlier — I cut VBA from 600 lines to 90 by pushing logic to Power Query. Result: faster and more maintainable by non-developers.",
    date: "Nov 12, 2024",
    read: "5 min",
    category: "excel",
  },
  {
    id: "j2",
    slug: "tailwind-in-2024-lessons",
    title: "Tailwind in 2024: What I Unlearned After 50 Landing Pages",
    excerpt:
      "Utility-first is not inline style. How I structure tokens, components, and keep 10k class projects sane.",
    content:
      "After 50+ landing pages, my Tailwind evolved. Early: class soup. Now: a layered system. Base tokens in CSS variables, then components, then utilities for layout.\n\nNever use arbitrary values unless tokenized. Use data attributes for variants. Keep animations in a separate file. Most important: design system > framework. Tailwind is just syntax.",
    date: "Oct 28, 2024",
    read: "7 min",
    category: "web",
  },
  {
    id: "j3",
    slug: "designing-for-umkm",
    title: "Designing for UMKM: Why Good Design is Cheap Ops",
    excerpt:
      "A good packaging system cut client print cost 18%. Design is operational leverage, not decoration.",
    content:
      "Working with a fried chicken franchise taught me: UMKM does not need aesthetics alone; it needs a system. One master file, three color variants, shared die-lines. That cut print cost because the printer could gang the same sheet.\n\nGood design means fewer decisions and less waste. My rule: if it cannot be explained to a cashier in two minutes, it is too complex.",
    date: "Sep 15, 2024",
    read: "4 min",
    category: "design",
  },
  {
    id: "j4",
    slug: "from-warehouse-to-webdev",
    title: "From Warehouse Staff to Web Dev: What Stock Taught Me About Code",
    excerpt:
      "Scanning barcodes at 2AM taught me more about UX than any course. Inventory is state management.",
    content:
      "My first job was warehouse staff. Stock opname taught me three principles:\n\n1. State must be visible, like physical stock.\n2. Input must be forgiving — barcode is better than repeated typing.\n3. Audit everything.\n\nWhen I built Inventory MS, I copied the warehouse flow: receive → QC → putaway → pick. Code architecture mirrored physical architecture. The best UX comes from the field.",
    date: "Aug 03, 2024",
    read: "6 min",
    category: "web",
  },
];
