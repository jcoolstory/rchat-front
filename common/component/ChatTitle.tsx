import styles from "./Chating.module.css";

type ChatTitleProps = {
    name: string
}
export const ChatTitle = ({name}: ChatTitleProps) => {
    return <div className={styles.chattitle}>{name} </div>
} 