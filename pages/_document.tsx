import axios from "axios";
import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { RecoilRoot } from "recoil";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    console.log("============document==============")
    const response  = await axios.get("http://localhost:3000/api/hello");
    console.log(response.data , "----------")

    return { data:response.data, ...initialProps }
  }

  render() {
    return (
      // html 태그에 언어 설정
      <Html lang="ko">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;