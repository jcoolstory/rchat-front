import type { NextPageContext } from "next";
import styles from "../styles/Home.module.css";

const Dashboard = () => {
  return (
    <div className={styles.container}>

    </div>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  return {
    redirect: {
      permanent: false,
      destination: "/dashboard",
    },
  };
};

export default Dashboard;
