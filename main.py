from qa import ask


def main():
    print("Duck QA - Ask me anything! (type 'quit' to exit)\n")
    while True:
        try:
            question = input("You: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nGoodbye!")
            break

        if not question:
            continue
        if question.lower() in ("quit", "exit"):
            print("Goodbye!")
            break

        answer = ask(question)
        print(f"\nDuck: {answer}\n")


if __name__ == "__main__":
    main()
