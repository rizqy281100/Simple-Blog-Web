import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-center">
            Sukses Corp International
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-gray-600 space-y-4">
          <p>
            Kami adalah perusahaan teknologi yang berkomitmen untuk memberikan
            solusi inovatif dan berkualitas tinggi kepada pelanggan kami di
            seluruh dunia. Dengan tim yang berdedikasi dan berpengalaman, kami
            terus berusaha untuk menciptakan produk dan layanan yang dapat
            membantu memajukan kehidupan digital masyarakat.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-8 text-left">
            <div className="p-4 border rounded-lg">
              <h3 className="font-bold mb-2">Visi</h3>
              <p className="text-sm">
                Membangun ekosistem digital yang inovatif dan inklusif untuk
                membantu masyarakat di seluruh dunia.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-bold mb-2">Misi</h3>
              <p className="text-sm">
                Menjadi perusahaan teknologi terdepan yang menyediakan layanan
                berkualitas tinggi untuk semua kalangan.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
