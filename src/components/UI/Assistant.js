const Assistant = (props) => {

  return (
    <img className={props.hidden ? 'assistant-hidden' : 'assistant'} src='/assets/images/assistant.png' alt='assistant' />
  )
}

export default Assistant;