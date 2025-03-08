import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageCompressor from './ImageCompressor';
import imageCompression from 'browser-image-compression';

jest.mock('browser-image-compression');

const mockCompressedBlob = new Blob(['mock compressed data'], {
  type: 'image/jpeg',
});

describe('ImageCompressor', () => {
  beforeEach(() => {
    (imageCompression as unknown as jest.Mock).mockReset();
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error during tests
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it('renders without crashing', () => {
    render(<ImageCompressor />);
    expect(
      screen.getByText(
        /Drag and drop an image file here, or click to select a file/i
      )
    ).toBeInTheDocument();
  });

  it('updates file state when a file is selected', () => {
    render(<ImageCompressor />);
    const file = new File(['dummy content'], 'dummy.jpg', {
      type: 'image/jpeg',
    });
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { files: [file] } });

    //We can not check the value of a type file input, so we check that the component receives the event.
    expect(screen.getByText(/Compress Image/i)).toBeEnabled();
  });

  it('updates file state when a file is dragged and dropped', () => {
    render(<ImageCompressor />);
    const file = new File(['dummy content'], 'dummy.jpg', {
      type: 'image/jpeg',
    });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    const dropArea = screen.getByText(/Drag and drop an image file here/i);
    fireEvent.dragOver(dropArea);
    fireEvent.drop(dropArea, { dataTransfer });

    expect(screen.getByText(/Compress Image/i)).toBeEnabled();
  });

  it('updates compression options', () => {
    render(<ImageCompressor />);
    const maxSizeInput = screen.getByRole('spinbutton', {
      name: 'Max Size (MB):',
    });
    const maxWidthHeightInput = screen.getByRole('spinbutton', {
      name: 'Max Width/Height:',
    });
    fireEvent.change(maxSizeInput, { target: { value: '2' } });
    fireEvent.change(maxWidthHeightInput, { target: { value: '1000' } });

    expect(maxSizeInput).toHaveValue(2);
    expect(maxWidthHeightInput).toHaveValue(1000);
  });

  it('calls imageCompression with correct parameters and sets compressed file', async () => {
    (imageCompression as jest.Mock).mockResolvedValue(mockCompressedBlob);
    render(<ImageCompressor />);
    const file = new File(['dummy content'], 'dummy.jpg', {
      type: 'image/jpeg',
    });
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { files: [file] } });

    const compressButton = screen.getByText(/Compress Image/i);
    fireEvent.click(compressButton);

    await waitFor(() => {
      expect(imageCompression).toHaveBeenCalledWith(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });
      expect(
        screen.getByText(/Download Compressed Image/i)
      ).toBeInTheDocument();
    });
  });

  it('handles image compression error', async () => {
    (imageCompression as jest.Mock).mockRejectedValue(
      new Error('Compression failed')
    );
    render(<ImageCompressor />);
    const file = new File(['dummy content'], 'dummy.jpg', {
      type: 'image/jpeg',
    });
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { files: [file] } });

    const compressButton = screen.getByText(/Compress Image/i);
    fireEvent.click(compressButton);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        'Error compressing image:',
        new Error('Compression failed')
      );
    });
  });

  it('download compressed image', async () => {
    (imageCompression as jest.Mock).mockResolvedValue(mockCompressedBlob);
    render(<ImageCompressor />);
    const file = new File(['dummy content'], 'dummy.jpg', {
      type: 'image/jpeg',
    });
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { files: [file] } });
    const compressButton = screen.getByText(/Compress Image/i);
    fireEvent.click(compressButton);

    await waitFor(() => {
      expect(imageCompression).toHaveBeenCalledWith(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });
      expect(
        screen.getByText(/Download Compressed Image/i)
      ).toBeInTheDocument();
    });

    const downloadButton = screen.getByText('Download Compressed Image');
    const mockCreateObjectURL = jest.fn(() => 'mock-url');
    URL.createObjectURL = mockCreateObjectURL;
    const mockRevokeObjectURL = jest.fn();
    URL.revokeObjectURL = mockRevokeObjectURL;
    const mockClick = jest.fn();

    jest.spyOn(document, 'createElement').mockReturnValue({
      href: '',
      download: '',
      click: mockClick,
    } as any);

    fireEvent.click(downloadButton);
    expect(mockCreateObjectURL).toHaveBeenCalledWith(mockCompressedBlob);
    expect(mockClick).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalledWith('mock-url');
  });

  it('disables compress button when no file is selected', () => {
    render(<ImageCompressor />);
    const compressButton = screen.getByText(/Compress Image/i);
    expect(compressButton).toBeDisabled();
  });

  it('updates the class of the Drop area when is drag over', () => {
    render(<ImageCompressor />);
    const dropArea = screen.getByText(/Drag and drop an image file here/i);
    fireEvent.dragOver(dropArea);
    expect(dropArea.parentElement).toHaveClass('border-blue-500');
    fireEvent.dragLeave(dropArea);
    expect(dropArea.parentElement).toHaveClass('border-gray-300');
  });
});
