import {
  Share2Icon,
  ImageIcon,
  Link2Icon,
  DownloadIcon,
} from '@radix-ui/react-icons';
import React from 'react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import usePreferences from '@/hooks/usePreferences';
import { toBlob, toPng, toSvg } from 'html-to-image';
import { useHotkeys } from 'react-hotkeys-hook';
import { toast } from 'sonner';

interface ExportOptionsProps {
  targetRef: React.RefObject<HTMLDivElement>;
}

export default function ExportOptions({ targetRef }: ExportOptionsProps) {
  const { title } = usePreferences();

  const copyImage = async () => {
    if (!targetRef.current) return;

    // const loading = toast.loading('Copying...');

    try {
      const imgBlob = await toBlob(targetRef.current, {
        pixelRatio: 2,
      });

      if (!imgBlob) return;

      const img = new ClipboardItem({ 'image/png': imgBlob });
      navigator.clipboard.write([img]);

      toast.success('Image copied to clipboard!');
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  // const copyLink = () => {
  //   try {
  //     const state = useStore.getState();
  //     const queryParams = new URLSearchParams({
  //       ...state,
  //       code: btoa(state.code),
  //     }).toString();
  //     navigator.clipboard.writeText(`${location.href}?${queryParams}`);

  //     toast.success('Link copied to clipboard!');
  //   } catch (error) {
  //     toast.error('Something went wrong!');
  //   }
  // };

  const saveImage = async (name: string, format: string) => {
    if (!targetRef.current) return;

    // const loading = toast.loading(`Exporting ${format} image...`);

    try {
      let imgUrl, filename;
      switch (format) {
        case 'PNG':
          imgUrl = await toPng(targetRef.current, { pixelRatio: 2 });
          filename = `${name}.png`;
          break;
        case 'SVG':
          imgUrl = await toSvg(targetRef.current, { pixelRatio: 2 });
          filename = `${name}.svg`;
          break;

        default:
          return;
      }

      const a = document.createElement('a');
      a.href = imgUrl;
      a.download = filename;
      a.click();

      toast.success('Exported successfully!');
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  useHotkeys('ctrl+c', copyImage);
  // useHotkeys('shift+ctrl+c', copyLink);
  useHotkeys('ctrl+s', () => saveImage(title, 'PNG'));
  useHotkeys('shift+ctrl+s', () => saveImage(title, 'SVG'));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Share2Icon className="mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark">
        <DropdownMenuItem className="gap-2" onClick={copyImage}>
          <ImageIcon />
          Copy Image
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2"
          onClick={() => {
            alert('Not implemented yet!');
            // copyLink();
          }}
        >
          <Link2Icon />
          Copy Link
          <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-2"
          onClick={() => saveImage(title, 'PNG')}
        >
          <DownloadIcon />
          Save as PNG
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2"
          onClick={() => saveImage(title, 'SVG')}
        >
          <DownloadIcon />
          Save as SVG
          <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
