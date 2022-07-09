import styles from './styles'
export default function Button ({ children, onClick, disabled }) {
  return (
    <>
      <button disabled={disabled} onClick={onClick}>
        {children}
      </button>
      <style jsx>{styles}</style>
    </>
  )
}
