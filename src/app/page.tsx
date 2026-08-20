/**
 * Entry point: renders the composition FUNNEL_TYPE selects. Both
 * types share the theme (applied in layout), the event beacons, and
 * the capture route; only the page composition differs.
 */
import QuizFunnel from '@/components/QuizFunnel';
import SalesPage from '@/components/SalesPage';
import { FUNNEL_TYPE } from '@/funnel/config';

export default function Home() {
  return FUNNEL_TYPE === 'sales-page' ? <SalesPage /> : <QuizFunnel />;
}
