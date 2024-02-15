import ReactMarkdown from "react-markdown";

interface MarkdownPageProps {
  children: string;
}

export const MarkdownPage = ({ children }: MarkdownPageProps) => {
  return (
    <ReactMarkdown
      className="space-y-3"
      components={{
        ul: (props) => <ul className="list-inside list-disc" {...props} />,
        a: (props) => <a {...props} className="text-blue-400 underliner" target="_blank"/>
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
