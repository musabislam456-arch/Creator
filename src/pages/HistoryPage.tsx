import { useAppStore } from '../lib/store';
import { CORE_TOOLS } from '../lib/tools-data';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Link } from 'react-router-dom';
import { Button, buttonVariants } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HistoryPage() {
  const { user, history } = useAppStore();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Sign in required</h1>
        <p className="text-muted-foreground mb-8">You need to be signed in to view your history.</p>
        <Link to="/" className={buttonVariants({ variant: "default" })}>
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Your History</h1>
      <p className="text-muted-foreground mb-8">View your previously generated content.</p>

      {history.length === 0 ? (
        <Card className="bg-muted/30 border-dashed">
          <CardContent className="py-12 text-center text-muted-foreground">
            You haven't generated any content yet.
            <div className="mt-4">
              <Link to="/" className={buttonVariants({ variant: "outline" })}>
                Explore Tools
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {history.map((item) => {
            const tool = CORE_TOOLS.find(t => t.id === item.toolId);
            return (
              <Card key={item.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {tool?.title || 'Unknown Tool'}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                    {tool && (
                      <Link to={`/tool/${tool.id}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                        Use Tool <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Input</span>
                    <p className="text-sm mt-1 bg-muted/50 p-2 rounded">{item.input}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Output</span>
                    <div className="text-sm mt-1 bg-muted/50 p-3 rounded max-h-40 overflow-y-auto prose prose-sm dark:prose-invert">
                      {item.output}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
