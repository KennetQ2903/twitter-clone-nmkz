import styles from './styles'
export default function Button ({ children, onClick }) {
  return (
    <>
      <button onClick={onClick}>
        {children}
      </button>
      <style jsx>{styles}</style>
    </>
  )
}
