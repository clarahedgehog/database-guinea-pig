const ErrorMessage = ({ error }: { error: string }) => {
  return <div className="text-hotpink">{error === "NEXT_REDIRECT" ? "" : error}</div>
}

export default ErrorMessage