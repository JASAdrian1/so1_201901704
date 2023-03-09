#include <linux/module.h>
#include <linux/kernel.h>

#include <linux/init.h>
#include <linux/proc_fs.h>
#include <asm/uaccess.h>
#include <linux/seq_file.h>

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Modulo de cpu, practica 2");
MODULE_AUTHOR("Jose Adrian Aguilar Sanchez");


static int escribir_archivo(struct seq_file *archivo, void *v){
    seq_printf(archivo,"PRUEBA\n");
    return 0;
}

//Informacion que se muestra al mostrar archivo con cat
static int al_abrir(struct inode *inode, struct file *file){
    return single_open(file,escribir_archivo,NULL);
}

static struct proc_ops operaciones = {
    .proc_open = al_abrir,
    .proc_read = seq_read
};


static int _insert(void){
    proc_create("cpu_201901704",0,NULL,&operaciones);
    printk(KERN_INFO "Se inserto el modulo CPU\n");
    return 0;
}

static void _remove(void){
    remove_proc_entry("cpu_201901704", NULL);
    printk(KERN_INFO "Se removio el modulo CPU\n");

}

module_init(_insert);
module_exit(_remove);
