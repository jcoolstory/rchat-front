import styles from "./Button.module.css";

type ButtonProps = React.HTMLAttributes<HTMLDivElement>
const Button = ({children, ...props}: ButtonProps) => {
    return <div className={styles.button} {...props} >{children}</div>
}

export default Button