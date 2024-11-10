package com.kakitiga;

import java.util.Scanner;

public class Main {
    static Menu[] daftarMenu = {
            new Menu("Sate Taichan", 15000, "Makanan"),
            new Menu("Mie Pangsit", 20000, "Makanan"),
            new Menu("Ayam Penyet", 15000, "Makanan"),
            new Menu("Kupat Tahu", 15000, "Makanan"),
            new Menu("Nasi Bakar", 10000, "Makanan"),
            new Menu("Air Mineral", 5000, "Minuman"),
            new Menu("Lemon Tea", 10000, "Minuman"),
            new Menu("Es Dugan", 10000, "Minuman"),
            new Menu("Jus Alpukat", 15000, "Minuman"),
            new Menu("Jus Mangga", 15000, "Minuman")
    };

    static double pajak = 0.1;
    static double biayaPelayanan = 20000;

    public static void tampilkanMenu() {
        System.out.println("\n------------------------------------");
        System.out.println("---------- SELAMAT DATANG ----------");
        System.out.println("--------- WARUNK KAKI TIGA ---------");
        System.out.println("------------------------------------\n");
        System.out.println("----------- MENU MAKANAN -----------\n");
        for (Menu item : daftarMenu) {
            if (item.getKategori().equals("Makanan")) {
                System.out.printf("%s\t\tRp%,.0f%n", item.getNama(), item.getHarga());
            }
        }

        System.out.println("\n----------- MENU MINUMAN -----------\n");
        for (Menu item : daftarMenu) {
            if (item.getKategori().equals("Minuman")) {
                System.out.printf("%s\t\tRp%,.0f%n", item.getNama(), item.getHarga());
            }
        }
        System.out.println("\n------------------------------------\n");
    }

    public static Menu cariMenu(String nama) {
        for (Menu item : daftarMenu) {
            if (item.getNama().equalsIgnoreCase(nama)) {
                return item;
            }
        }
        return null;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        tampilkanMenu();

        Menu[] pesanan = new Menu[4];
        int[] jumlahPesanan = new int[4];
        double totalBiaya = 0;
        double totalPromo = 0;
        String produkPromo = "";

        System.out.println("\nMasukkan pesanan Anda (maksimal 4 item):");
        for (int i = 0; i < 4; i++) {
            System.out.print("Nama Menu " + (i + 1) + ": ");
            String namaMenu = scanner.nextLine();
            Menu menu = cariMenu(namaMenu);

            if (namaMenu.equalsIgnoreCase("Selesai")) {
                break;
            }
            if (menu == null) {
                System.out.println("\nMenu tidak ditemukan, silakan coba lagi.");
                i--;
            } else {
                System.out.print("Jumlah: ");
                int jumlah = scanner.nextInt();
                scanner.nextLine();

                pesanan[i] = menu;
                jumlahPesanan[i] = jumlah;
                totalBiaya += menu.getHarga() * jumlah;
            }
        }

        double totalBiayaDenganPajak;
        totalBiayaDenganPajak = totalBiaya + (totalBiaya * pajak) + biayaPelayanan;
        double totalSetelahDiskon = totalBiayaDenganPajak;

        if (totalBiaya > 100000) {
            totalSetelahDiskon -= totalBiaya * 0.1;
        }

        if (totalBiaya > 50000) {
            boolean minumanGratis = false;

            for (int i = 0; i < pesanan.length && pesanan[i] != null; i++) {
                if (pesanan[i].getKategori().equals("Minuman") && !minumanGratis) {
                    totalSetelahDiskon -= pesanan[i].getHarga();
                    produkPromo = pesanan[i].getNama();
                    totalPromo -= pesanan[i].getHarga();
                    minumanGratis = true;
                }
            }
        }

        System.out.println("\n------------------------------------");
        System.out.println("----------- STRUK BELANJA ----------");
        System.out.println("--------- WARUNK KAKI TIGA ---------");
        System.out.println("------------------------------------\n");
        for (int i = 0; i < pesanan.length && pesanan[i] != null; i++) {
            Menu menu = pesanan[i];
            int jumlah = jumlahPesanan[i];
            double hargaTotalItem = menu.getHarga() * jumlah;
            System.out.printf("%s", menu.getNama());
            System.out.printf("%n%d x %,.0f\t\tRp%,.0f%n", jumlah, menu.getHarga(), hargaTotalItem);
        }
        if (totalBiaya > 50000) {
            boolean minumanGratis = false;

            for (int i = 0; i < pesanan.length && pesanan[i] != null; i++) {
                if (pesanan[i].getKategori().equals("Minuman") && !minumanGratis) {
                    System.out.printf("%s", produkPromo);
                    System.out.printf("\n1 x %,.0f\t\tRp%,.0f", totalPromo*-1, totalPromo*-1);
                    System.out.printf("\n\t\t\t%,.0f%n", totalPromo);
                    minumanGratis = true;
                }
            }
        }

        System.out.println("\n------------------------------------");
        System.out.printf("\nSubtotal\t\tRp%,.0f", totalBiaya);
        if (totalBiaya > 100000) {
            System.out.printf("\nDiskon 10%%\t\t-%,.0f", totalBiaya * 0.1);
        }
        if (totalBiaya > 50000) {
            boolean minumanGratis = false;

            for (int i = 0; i < pesanan.length && pesanan[i] != null; i++) {
                if (pesanan[i].getKategori().equals("Minuman") && !minumanGratis) {
                    System.out.println("\nPromo");
                    System.out.printf("  %s\t\t%,.0f", produkPromo, totalPromo);
                    minumanGratis = true;
                }
            }
        }
        System.out.printf("\nPajak 10%%\t\tRp%,.0f", (totalBiaya * pajak));
        System.out.printf("\nBiaya Pelayanan\t\tRp%,.0f", biayaPelayanan);
        System.out.printf("\nTotal\t\t\tRp%,.0f%n", totalSetelahDiskon);
        System.out.println("\n------------------------------------");
        System.out.println("--------- TERIMAKASIH SUDAH --------");
        System.out.println("------------ BERBELANJA ------------");
        System.out.println("------------------------------------\n");


        scanner.close();
    }
}