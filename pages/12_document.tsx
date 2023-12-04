import axios from 'axios'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    console.log("============document==============")
    const response  = await axios.get("http://localhost:3000/api/hello");
    console.log(response.data , "----------")

    return { data:response.data, ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument