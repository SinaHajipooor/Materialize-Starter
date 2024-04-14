import axiosConfig from "src/utils/axios/axios";

// download file 
export const handleDownload = async (id: number, token: string) => {
    try {
        const response = await axiosConfig.get(`/admin/base/file/download/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            responseType: 'blob',
        });

        const blob = new Blob([response.data], { type: response.headers['content-type'] });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);

        const fileName = response.headers['content-disposition']?.split('filename=')[1] || 'downloadedFile';
        link.download = fileName;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    } catch (error) {
        console.error('Error downloading file:', error);
    }
}
