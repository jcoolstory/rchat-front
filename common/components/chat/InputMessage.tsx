import ChartHistorical from "@components/ChartHistorical";

class InputMessage {
  public static handler(params: string): any {
    const command = params[0];
    if (command === "/") {
      const tokens = params.split(" ");
      if (tokens[0] === "/chart") {
        return {
          pass: true,
          type: "component",
          data: <ChartHistorical ticker={tokens[1]} />,
        };
      }
      return {
        pass: true,
      };
    }

    return {
      pass: false,
    };
  }
}

export const renderCommand = (message:string) =>{
    const result = InputMessage.handler(message);
    if (result.pass === true && result.type === "component")
        return result.data;
    return null;
}
export default InputMessage;
