import LineChart from "@components/LineChart";
import { useQueries, useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { NextPageWithLayout } from "pages/_app";
import { getChartHistoricals } from "./api";

const ComponentsWithNoSSR = dynamic(
  // typescript에서 props를 전달할때 interface를 정의해줍니다.
  () => import("../../common/components/LineChart"), // Component로 사용할 항목을 import합니다.
  { ssr: false } // ssr옵션을 false로 설정해줍니다.
);

const ChatRoomPage: NextPageWithLayout = () => {
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getChartTicker"],
    queryFn: async () => {
      const data = await getChartHistoricals("MSFT");
        return data as []
    },
    initialData:[],
  });

  return (
    <div>
        {!isLoading && <ComponentsWithNoSSR data={data} />}
    </div>
  );
};

export default ChatRoomPage;
