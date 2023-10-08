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
import queryString from 'query-string';

interface ExportOptionsProps {
  targetRef: React.RefObject<HTMLDivElement>;
}

export default function ExportOptions({ targetRef }: ExportOptionsProps) {
  const {
    title,
    code,
    autoDetectLanguage,
    darkMode,
    fontSize,
    fontStyle,
    language,
    padding,
    theme,
  } = usePreferences();

  const copyImage = async () => {
    if (!targetRef.current) return;

    try {
      const imgBlob = await toBlob(targetRef.current, {
        pixelRatio: 2,
      });

      if (!imgBlob) return;

      const img = new ClipboardItem({ 'image/png': imgBlob });
      navigator.clipboard.write([img]);

      toast.success('이미지가 클립보드에 복사되었습니다!');
    } catch (error) {
      toast.error('이미지 복사 중 문제가 생겼습니다!');
    }
  };

  const copyLink = () => {
    try {
      const url = queryString.stringifyUrl(
        {
          url: location.href,
          query: {
            code: btoa(code),
            autoDetectLanguage,
            darkMode,
            fontSize,
            fontStyle,
            language,
            padding,
            theme,
          },
        },
        {
          skipEmptyString: true,
          skipNull: true,
        },
      );

      console.log('url: ', url);

      navigator.clipboard.writeText(url);

      toast.success('URL이 클릭보드에 복사되었습니다!');
    } catch (error) {
      toast.error('URL 복사 중 문제가 생겼습니다!');
    }
  };

  const saveImage = async (name: string, format: string) => {
    if (!targetRef.current) return;

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

      toast.success('이미지가 성공적으로 저장되었습니다!');
    } catch (error) {
      toast.error('이미지 저장에 실패했습니다.');
    }
  };

  useHotkeys('ctrl+c', copyImage);
  useHotkeys('shift+ctrl+c', copyLink);
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
            copyLink();
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
