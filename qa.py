import anthropic


def ask(question: str) -> str:
    client = anthropic.Anthropic()
    message = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=1024,
        messages=[{"role": "user", "content": question}],
    )
    for block in message.content:
        if block.type == "text":
            return block.text
    return ""
