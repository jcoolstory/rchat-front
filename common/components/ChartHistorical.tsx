import { useQuery } from "@tanstack/react-query";
import { getChartHistoricals } from "pages/wsroom/api";
import dynamic from "next/dynamic";

const ComponentsWithNoSSR = dynamic(
    // typescript에서 props를 전달할때 interface를 정의해줍니다.
    () => import("./LineChart"), // Component로 사용할 항목을 import합니다.
    { ssr: false } // ssr옵션을 false로 설정해줍니다.
  );
  
// MSFT
const ChartHistorical = ({ ticker }: { ticker: string }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getChartTicker", ticker],
    queryFn: async () => {
      const data = await getChartHistoricals(ticker);
      return data as [];
    },
    refetchOnWindowFocus:false,
    initialData: [],
  });

  return <div>{!isLoading && <ComponentsWithNoSSR data={data} />}</div>;
};

export default ChartHistorical;
