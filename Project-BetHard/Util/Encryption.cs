using System;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Project_BetHard.Util
{
    public class Encryption
    {
        //Encrpts plain text with AES
        public static byte[] Encrypt(string data, byte[] Key, byte[] IV)
        {
            if (data == null || data.Length <= 0)
                throw new ArgumentNullException("plainText");
            if (Key == null || Key.Length <= 0)
                throw new ArgumentNullException("Key");
            if (IV == null || IV.Length <= 0)
                throw new ArgumentNullException("IV");
            byte[] encrypted;

            using (Aes aesAlg = Aes.Create())
            {
                aesAlg.Mode = CipherMode.CBC;
                aesAlg.KeySize = Key.Length * 8;
                aesAlg.BlockSize = IV.Length * 8;
                aesAlg.Padding = PaddingMode.Zeros;

                aesAlg.Key = Key;
                aesAlg.IV = IV;

                using (ICryptoTransform encryptor = aesAlg.CreateEncryptor())
                {
                    using (MemoryStream msEncrypt = new MemoryStream())
                    {
                        using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                        {
                            using (StreamWriter swEncrypt = new StreamWriter(csEncrypt))
                            {
                                //Write all data to the stream.
                                swEncrypt.Write(data);
                            }
                            encrypted = msEncrypt.ToArray();
                        }
                    }
                }
            }
            return encrypted;
        }

        //Decrypts data to plain text
        public static string Decrypt(byte[] data, byte[] Key, byte[] IV)
        {
            if (data == null || data.Length <= 0)
                throw new ArgumentNullException("plainText");
            if (Key == null || Key.Length <= 0)
                throw new ArgumentNullException("Key");
            if (IV == null || IV.Length <= 0)
                throw new ArgumentNullException("IV");
            string decrypted;

            using (Aes aesAlg = Aes.Create())
            {
                aesAlg.Mode = CipherMode.CBC;
                aesAlg.KeySize = Key.Length * 8;
                aesAlg.BlockSize = IV.Length * 8;
                aesAlg.Padding = PaddingMode.Zeros;

                aesAlg.Key = Key;
                aesAlg.IV = IV;

                using (ICryptoTransform decryptor = aesAlg.CreateDecryptor())
                {
                    using (MemoryStream msDecrypt = new MemoryStream(data))
                    {
                        using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                        {
                            using (StreamReader srDecrypt = new StreamReader(csDecrypt))
                            {
                                decrypted = srDecrypt.ReadToEnd();
                            }
                        }
                    }
                }
            }
            return decrypted;
        }

        //Generates SHA256 byte[] array for use as key in encryption and decryption
        public static byte[] GetKey(string textKey)
        {
            byte[] key;
            using (SHA256 sha256 = SHA256.Create())
            {
                key = sha256.ComputeHash(Encoding.UTF8.GetBytes(textKey));
                Array.Resize(ref key, 16);
            }
            return key;
        }

        //Generates and returns IV
        public static byte[] GetIV()
        {
            byte[] IV;
            using (Aes aesAlg = Aes.Create())
            {
                IV = aesAlg.IV;
            }
            return IV;
        }
    }
}