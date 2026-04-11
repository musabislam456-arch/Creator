import { useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { CORE_TOOLS } from '../lib/tools-data';
import { generateContent } from '../lib/gemini';
import { useAppStore } from '../lib/store';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Loader2, Copy, CheckCircle2, MessageSquare, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Label } from '../components/ui/label';
import { MicButton } from '../components/MicButton';

const LANGUAGES = [
  "English", "Spanish", "French", "German", "Hindi", 
  "Arabic", "Portuguese", "Urdu", "Mandarin", "Japanese", 
  "Russian", "Bengali", "Indonesian", "Korean", "Italian"
];

export function ToolPage() {
  const { id } = useParams<{ id: string }>();
  const tool = CORE_TOOLS.find(t => t.id === id);
  const navigate = useNavigate();
  
  const { user, comments, addComment, addHistory } = useAppStore();
  const [input, setInput] = useState('');
  const [extraInput1, setExtraInput1] = useState('');
  const [extraInput2, setExtraInput2] = useState('');
  const [language, setLanguage] = useState('English');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [commentText, setCommentText] = useState('');

  if (!tool) {
    return <Navigate to="/" replace />;
  }

  const handleGenerate = async () => {
    if (!input.trim()) {
      toast.error('Please fill in the required fields.');
      return;
    }

    setIsLoading(true);
    setOutput('');
    
    try {
      let finalInput = input;
      if (tool.id === 'seo-title-generator') finalInput = `Keyword: ${extraInput1}\nContext: ${input}`;
      if (tool.id === 'viral-hook-generator') finalInput = `Topic: ${input}\nTone: ${extraInput1 || 'Engaging'}`;
      if (tool.id === 'shorts-script-generator') finalInput = `Concept: ${input}\nTarget Audience: ${extraInput1}`;
      if (tool.id === 'ai-rewrite-tool') finalInput = `Original Script: ${input}\nGoal: ${extraInput1 || 'More engaging'}`;

      let prompt = tool.promptTemplate.replace('{input}', finalInput);
      if (tool.supportsLanguage) {
        prompt = prompt.replace('{language}', language);
      }
      const result = await generateContent(prompt);
      setOutput(result);
      addHistory(tool.id, finalInput, result);
      toast.success('Content generated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate content.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    addComment(commentText);
    setCommentText('');
    toast.success('Comment added!');
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 -ml-4 text-muted-foreground">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{tool.title}</h1>
        <p className="text-muted-foreground text-lg">{tool.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Input Section */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>What is your content about?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {tool.supportsLanguage && (
              <div className="space-y-2">
                <Label>Output Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map(lang => (
                      <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Unique Interfaces per Tool */}
            {tool.id === 'seo-title-generator' && (
              <div className="space-y-2">
                <Label>Main Keyword</Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="E.g., YouTube Algorithm 2026" 
                    value={extraInput1}
                    onChange={(e) => setExtraInput1(e.target.value)}
                  />
                  <MicButton onTranscript={(text) => setExtraInput1(prev => prev + (prev ? ' ' : '') + text)} />
                </div>
              </div>
            )}

            {tool.id === 'viral-hook-generator' && (
              <div className="space-y-2">
                <Label>Hook Tone</Label>
                <Select value={extraInput1} onValueChange={setExtraInput1}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Funny">Funny</SelectItem>
                    <SelectItem value="Shocking">Shocking</SelectItem>
                    <SelectItem value="Educational">Educational</SelectItem>
                    <SelectItem value="Story-driven">Story-driven</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {tool.id === 'shorts-script-generator' && (
              <div className="space-y-2">
                <Label>Target Audience</Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="E.g., Teenagers, Tech Enthusiasts, Beginners..." 
                    value={extraInput1}
                    onChange={(e) => setExtraInput1(e.target.value)}
                  />
                  <MicButton onTranscript={(text) => setExtraInput1(prev => prev + (prev ? ' ' : '') + text)} />
                </div>
              </div>
            )}

            {tool.id === 'ai-rewrite-tool' && (
              <div className="space-y-2">
                <Label>Rewrite Goal</Label>
                <Select value={extraInput1} onValueChange={setExtraInput1}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="More engaging">More engaging</SelectItem>
                    <SelectItem value="Shorter and punchier">Shorter and punchier</SelectItem>
                    <SelectItem value="Funnier">Funnier</SelectItem>
                    <SelectItem value="More professional">More professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label>
                {tool.id === 'ai-rewrite-tool' ? 'Add your Script' : 
                 tool.id === 'caption-generator' ? 'Video/Image Description' :
                 tool.id === 'seo-title-generator' ? 'Video Context' :
                 tool.id === 'shorts-script-generator' ? 'Short Concept' :
                 'Topic / Context'}
              </Label>
              <div className="relative">
                <Textarea 
                  placeholder={
                    tool.id === 'ai-rewrite-tool' ? "Paste the script you want to rewrite..." :
                    tool.id === 'caption-generator' ? "Describe what happens in your video or image..." :
                    "E.g., A video about 5 tips for beginner photographers..."
                  }
                  className="min-h-[200px] resize-none pb-10"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <div className="absolute bottom-2 right-2">
                  <MicButton onTranscript={(text) => setInput(prev => prev + (prev ? ' ' : '') + text)} />
                </div>
              </div>
            </div>

            {tool.id === 'caption-generator' && (
              <div className="space-y-2">
                <Label>Upload Video/Image (Optional Context)</Label>
                <Input type="file" accept="video/*,image/*" />
                <p className="text-xs text-muted-foreground">Upload media to help you remember the context.</p>
              </div>
            )}

            <Button 
              className="w-full" 
              size="lg" 
              onClick={handleGenerate}
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Content'
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card className="shadow-sm flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>Result</CardTitle>
              <CardDescription>Your AI-generated content</CardDescription>
            </div>
            {output && (
              <div className="flex space-x-2">
                {tool.id === 'shorts-script-generator' && (
                  <Button variant="outline" size="sm" onClick={() => {
                    const scriptOnly = output.replace(/\[.*?\]/g, '').trim();
                    navigator.clipboard.writeText(scriptOnly);
                    toast.success('Script only copied!');
                  }}>
                    Copy Script Only
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {isCopied ? <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {tool.id === 'caption-generator' ? 'Ready to Copy' : 'Copy All'}
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="flex-1">
            {output ? (
              <div className="bg-muted/50 rounded-lg p-4 h-full min-h-[200px] overflow-y-auto prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{output}</ReactMarkdown>
              </div>
            ) : (
              <div className="h-full min-h-[200px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg p-4 text-center">
                Your generated content will appear here.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Comments Section */}
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center space-x-2 mb-6">
          <MessageSquare className="h-5 w-5" />
          <h2 className="text-2xl font-bold">Community Reviews</h2>
        </div>

        {user ? (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <form onSubmit={handleAddComment} className="flex gap-4">
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Input 
                    placeholder="Share your experience with this tool..." 
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button type="submit" size="sm" disabled={!commentText.trim()}>Post Review</Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-8 bg-muted/30">
            <CardContent className="pt-6 text-center text-muted-foreground">
              Please sign in to leave a review or comment.
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment.id} className="bg-card">
              <CardContent className="p-4 flex gap-4">
                <Avatar>
                  <AvatarImage src={comment.userAvatar} />
                  <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-sm">{comment.userName}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/90">{comment.text}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
